class Constants {

  public ROLES = {
    SUPER_ADMIN: 'superAdmin',
    ADMIN: 'admin',
    USER: 'USER',
    MANUFACTURER: 'manufacturer',
    DISTRIBUTOR: 'distributor',
    SPECIALIST: 'specialist'
  };

  public ACTIVE = 'active';
  public SUSPENDED = 'suspended';
  public INACTIVE = 'inactive';

  rolesToArray() {
    return Object['values'](this.ROLES);
  }

  adminRoles() {
    return [this.ROLES.ADMIN, this.ROLES.SUPER_ADMIN];
  }

  getLocation(folderName = '') {
    return window.location.origin + '/' + folderName;
    // 'http://localhost:3000' + '/' + folderName
  }

}

export default new Constants;
