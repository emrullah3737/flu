class Auth {
  constructor() {
    // TODO: session auto login

    const profile = window.sessionStorage.getItem("profile");
    this.isLogin = profile ? true : false;
    if (profile) return this.profile = profile;
    return this.profile = null;
  }

  login(user) {
    if (user) {
      this.isLogin = true;
      return this.setProfile(user);
    }
    return this.profile = null;
  }

  getProfile() {
    return JSON.parse(this.profile);
  }

  setProfile(user) {
    window.sessionStorage.setItem("profile", JSON.stringify(user));
    return this.profile = JSON.stringify(user);
  }

  logout(cb) {
    if (this.profile) this.profile = null;
    this.isLogin = false;
    sessionStorage.clear();
    return cb();
  }
}
export default new Auth();
