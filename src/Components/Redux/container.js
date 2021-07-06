import { connect } from "react-redux";
import { formDataHandler } from "./action";
import layout from "../Layout";

const MapStateToProps = (state) => ({
  formData: state.formData,
});

const dispatcher = {
  formDataHandler,
};

const WrapComponent = connect(MapStateToProps, dispatcher);
export const Layout = WrapComponent(layout);
