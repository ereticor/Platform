import { Link } from "react-router-dom";

import { IAppCard } from "interfaces/app";

import "./AppCard.sass";

const AppCard = ({ app, className }: { app: IAppCard; className: string }) => {
  const { name, description, keywords } = app;

  return (
    <Link to={`/${name}`} className={`card ${className}`}>
      <div className="card__wrapper">
        <h3 className="card__name">{name}</h3>
        <p className="card__description">{description}</p>
        <div className="card__keywords">
          {keywords.map((keyword, key) => (
            <p key={`usage ${key}`} className="keyword">
              {keyword}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default AppCard;
