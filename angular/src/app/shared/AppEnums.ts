import { TenantAvailabilityState } from '@shared/service-proxies/service-proxies';


export class AppTenantAvailabilityState {
    static Available: number = TenantAvailabilityState.Available;
    static InActive: number = TenantAvailabilityState.InActive;
    static NotFound: number = TenantAvailabilityState.NotFound;
}