import Entity from './entity'
export default class Member extends Entity<number>{
    nickName:string='';
    headLogo:string='';
    gender:string='';
    city:string='';
    province:string='';
    country:string='';
}