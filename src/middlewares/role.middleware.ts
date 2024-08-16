import { AccessControl } from 'accesscontrol';
let grantList = [
    { role: 'admin', resource: 'profile', action: 'read:any', attributes: '*, !views' },
    { role: 'user', resource: 'profile', action: 'read:own', attributes: '*' },
];
const rbac = new AccessControl();
export default rbac