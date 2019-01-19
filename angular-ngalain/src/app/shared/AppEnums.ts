import { IsTenantAvailableOutputState } from '@shared/service-proxies/service-proxies';


export class AppTenantAvailabilityState {
    static Available: number = IsTenantAvailableOutputState.Available;
    static InActive: number = IsTenantAvailableOutputState.InActive;
    static NotFound: number = IsTenantAvailableOutputState.NotFound;
}