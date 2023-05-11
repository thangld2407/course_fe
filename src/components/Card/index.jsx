import { CardWrapper } from "./styles";

// eslint-disable-next-line react/prop-types
function BaseCardManage({ children, ...props }) {
  return (
    <CardWrapper {...props}>
      <div className="card__content">{children}</div>
    </CardWrapper>
  );
}

export default BaseCardManage;
