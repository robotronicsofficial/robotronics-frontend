import PropTypes from "prop-types";

const AppImage = ({
  loading = "lazy",
  decoding = "async",
  fetchPriority = "auto",
  ...props
}) => (
  <img
    loading={loading}
    decoding={decoding}
    fetchPriority={fetchPriority}
    {...props}
  />
);

AppImage.propTypes = {
  loading: PropTypes.string,
  decoding: PropTypes.string,
  fetchPriority: PropTypes.string,
};

export default AppImage;
