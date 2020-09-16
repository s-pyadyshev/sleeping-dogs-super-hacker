import { ifElse, T } from "ramda";
import Loading from "../components/Loading";

const withLoading = ifElse(T, Loading, () => {});

export default withLoading;
