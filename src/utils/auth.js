class Auth {
  constructor() {
    // TODO: session auto login

    const profile = sessionStorage.getItem("profile");;
    this.isLogin = profile ? true : false;
    if (profile) return this.profile = profile;
    return this.profile = null;
  }

  login(body) {
    const { email, password } = body;
    if (email && password) {
      this.isLogin = true;
      sessionStorage.setItem("profile", "ok");
      return this.profile = body;
    }

    return this.profile = null;
  }

  logout(cb) {
    if (this.profile) this.profile = null;
    this.isLogin = false;
    sessionStorage.clear();
    return cb();
  }
}
export default new Auth();
