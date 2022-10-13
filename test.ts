interface AuthProvider {
  login: Function;
}

const authProvider = (loginUrl): AuthProvider => ({
  login: () => {
    console.log(loginUrl);
  },
});

const abc = () => {};

export default authProvider;
export { abc };
