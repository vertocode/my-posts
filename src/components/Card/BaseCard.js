import { jsx as _jsx } from "react/jsx-runtime";
import './BaseCard.scss';
const BaseCard = ({ children, className }) => {
    return (_jsx("div", { className: `BaseCard ${className}`, children: children }));
};
export default BaseCard;
