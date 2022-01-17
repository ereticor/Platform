import FormControls from "components/FormControls";
import ProgressSpinner from "components/ProgressSpinner";
import customerHeaders from "helpers/getDisplayedValue/definedHeaders/customerHeaders";
import ICustomer from "interfaces/Customer";
import ModuleHeader from "modules/shared/ModuleHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomerService from "services/customer.service";
import CustomerProfileWrapper from "modules/customerManagement/CustomerProfileWrapper";
import "./CustomerDetails.scss";
import getDisplayedValue from "helpers/getDisplayedValue";

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [isLoadingCustomer, setIsLoadingCustomer] = useState(false);
  const [customer, setCustomer] = useState<ICustomer | null>(null);

  const handleCustomerLoad = async () => {
    setIsLoadingCustomer(true);
    if (customerId) {
      const currentCustomer = await CustomerService.getCustomer(customerId);
      setCustomer(currentCustomer);
    }
    setIsLoadingCustomer(false);
  };

  useEffect(() => {
    handleCustomerLoad();
  }, []);

  return (
    <div className="customer__profile">
      <ModuleHeader
        title={customer?.name || "unknown customer"}
        backLink={"/customer"}
      />
      {customer ? (
        <>
          <CustomerProfileWrapper>
            {customerHeaders.map((header, index) => (
              <div
                key={`field: ${header.prop} ${index}`}
                className="customer__field"
              >
                <p className="field__prop">{header.text}</p>
                <p className="field__value">
                  {getDisplayedValue({
                    data: customer,
                    header,
                  })}
                </p>
              </div>
            ))}
          </CustomerProfileWrapper>
          <FormControls
            cancelLink="/customer"
            submitLink={`/customer/${customer.id}/edit`}
            submitBtnText="delete"
          />
        </>
      ) : (
        <div>no data available</div>
      )}
      <ProgressSpinner isLoading={isLoadingCustomer} />
    </div>
  );
};

export default CustomerDetails;
