import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
import Member from '../entities/member'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'

interface MemberState extends ListState<Member>{
    editMember:Member,
}
class MemberMutations extends ListMutations<Member>{
}
class MemberModule extends ListModule<MemberState,any,Member>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Member>(),
        loading:false,
        editMember:new Member(),
    }
    actions={
        async getAll(context:ActionContext<MemberState,any>,payload:any){
            context.state.loading=true;
            let reponse=await Ajax.get('/api/services/app/MemberUser/GetAll',{params:payload.data});
            context.state.loading=false;
            let page=reponse.data.result as PageResult<Member>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
        },
        async get(context:ActionContext<MemberState,any>,payload:any){
            let reponse=await Ajax.get('/api/services/app/MemberUser/Get?Id='+payload.id);
            return reponse.data.result as Member;
        }
    };
    mutations={
        setCurrentPage(state:MemberState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:MemberState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:MemberState,member:Member){
            state.editMember=member;
        }
    }
}
const memberModule=new MemberModule();
export default memberModule;