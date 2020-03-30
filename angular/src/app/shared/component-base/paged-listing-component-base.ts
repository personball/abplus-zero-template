import { AppComponentBase } from '@shared/component-base/app-component-base';
import { Injector, OnInit, ViewChild } from '@angular/core';
import { STChange, STComponent } from '@delon/abc';

export class PagedResultDto {
    items: any[];
    totalCount: number;
}

export class EntityDto {
    id: number;
}

export class PagedRequestDto {
    skipCount: number;
    maxResultCount: number;
}

export class PagedAndSortedResultRequestDto extends PagedRequestDto {
    sorting: string;
}

// tslint:disable-next-line:no-shadowed-variable
export abstract class PagedListingComponentBase<EntityDto> extends AppComponentBase implements OnInit {

    public pageSize: number = 10;
    public pageNumber: number = 1;
    public totalPages: number = 1;
    public totalItems: number;
    public isTableLoading = false;

    public filter: any;
    public sorting: string;
    @ViewChild('st') st: STComponent;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.refresh();
    }

    refresh(): void {
        this.getDataPage(this.pageNumber);
    }

    public showPaging(result: PagedResultDto, pageNumber: number): void {
        this.totalPages = ((result.totalCount - (result.totalCount % this.pageSize)) / this.pageSize) + 1;

        this.totalItems = result.totalCount;
        this.pageNumber = pageNumber;
    }

    public getDataPage(page: number): void {
        let req = new PagedAndSortedResultRequestDto();
        req.maxResultCount = this.pageSize;
        req.skipCount = (page - 1) * this.pageSize;
        req.sorting = this.sorting;
        this.isTableLoading = true;
        this.list(req, page, () => {
            this.isTableLoading = false;
        });
    }

    query(event: any) {
        // this.st.reset(event);
        this.filter = event;
        this.getDataPage(1); // getDataPage 新建了一个requestDto并把页码赋进去了
    }

    change(event: STChange) {
        if (event.type === 'pi') {
            this.getDataPage(event.pi);
        }

        if (event.type === 'sort') {
            // 可以选择由前端处理排序转换,也可以考虑把整个event.sort传给后端再处理
            // console.log(event.sort);
            if (event.sort.value === 'ascend') {
                this.sorting = event.sort.column.sort + ' asc';
                // for (const key in event.sort.map) {
                //     if (event.sort.map.hasOwnProperty(key)) {
                //         const element = event.sort.map[key];
                //         this.sort = [this.sort, `${key} asc`].join(',');
                //     }
                // }
                // console.log(this.sort);
            } else if (event.sort.value === 'descend') {
                this.sorting = event.sort.column.sort + ' desc';
            } else {
                this.sorting = '';
            }
            // console.log(this.sorting);
            this.getDataPage(1);
        }

    }

    protected abstract list(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void;
    protected abstract delete(entity: EntityDto): void;
}
