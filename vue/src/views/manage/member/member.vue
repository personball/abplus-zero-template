	<template>
  <div>
    <Card dis-hover>
      <div class="page-body">
        <Form
          ref="queryForm"
          :label-width="80"
          label-position="left"
          inline
        >
          <Row :gutter="16">
            <Col span="8">
            <FormItem
              :label="L('Keyword')+':'"
              style="width:100%"
            >
              <Input v-model="keyword"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem
              :label="L('CreationTime')+':'"
              style="width:100%"
            >
              <DatePicker
                v-model="dateRange"
                type="datetimerange"
                format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
                placement="bottom-end"
                :placeholder="L('SelectDate')"
              ></DatePicker>
            </FormItem>
            </Col>
            <Col span="8">
            <Button
              icon="ios-search"
              type="primary"
              size="large"
              @click="getpage"
              class="toolbar-btn"
            >{{L('Find')}}</Button>
            </Col>
          </Row>
        
        </Form>
        <div class="margin-top-10">
          <Table
            :loading="loading"
            :columns="columns"
            :no-data-text="L('NoDatas')"
            border
            :data="list"
          >
          </Table>
          <Page
            show-sizer
            class-name="fengpage"
            :total="totalCount"
            class="margin-top-10"
            @on-change="pageChange"
            @on-page-size-change="pagesizeChange"
            :page-size="pageSize"
            :current="currentPage"
          ></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject, Prop, Watch } from "vue-property-decorator";
import Util from "../../../lib/util";
import AbpBase from "../../../lib/abpbase";
import { FieldType, Filter, CompareType } from "../../../store/entities/filter";
import PageRequest from "../../../store/entities/page-request";

class PageMemberRequest extends PageRequest {
  keyword: String;
  from: Date;
  to: Date;
}

@Component
export default class Members extends AbpBase {
  keyword: String = "";
  dateRange: Array<Date> = [];
  get list() {
    return this.$store.state.member.list;
  }
  get loading() {
    return this.$store.state.member.loading;
  }
  
  pageChange(page: number) {
    this.$store.commit("member/setCurrentPage", page);
    this.getpage();
  }
  pagesizeChange(pagesize: number) {
    this.$store.commit("member/setPageSize", pagesize);
    this.getpage();
  }
  async getpage() {
    let pagerequest = new PageMemberRequest();
    pagerequest.maxResultCount = this.pageSize;
    pagerequest.skipCount = (this.currentPage - 1) * this.pageSize;
    pagerequest.keyword = this.keyword;
    pagerequest.from = this.dateRange[0];
    pagerequest.to = this.dateRange[1];
    await this.$store.dispatch({
      type: "member/getAll",
      data: pagerequest
    });
  }
  get pageSize() {
    return this.$store.state.member.pageSize;
  }
  get totalCount() {
    return this.$store.state.member.totalCount;
  }
  get currentPage() {
    return this.$store.state.member.currentPage;
  }
  columns = [
    {
      title: this.L("Id"),
      key: "id",
      width: 80
    },
    {
      title: this.L("昵称"),
      key: "nickName"
    },
    {
      title: this.L("头像"),
      key: "headLogo",
      width:90,
      render: (h: any, params: any) => {
        return h("img", {
          attrs: {
            src: params.row.headLogo
          },
          style: {
            width: "50px"
          }
        });
      }
    },{
      title: this.L("城市"),
      key: "city"
    },{
      title: this.L("省份"),
      key: "province"
    },{
      title: this.L("国家"),
      key: "country"
    },
    {
      title: this.L("CreationTime"),
      key: "creationTime",
      width: 180,
      render: (h: any, params: any) => {
        return h("span", new Date(params.row.creationTime).toLocaleString());
      }
    }
  ];
  async created() {
    this.getpage();
  }
}
</script>