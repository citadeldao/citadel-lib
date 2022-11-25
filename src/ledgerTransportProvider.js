import state from "./state";
import WebHidTransport from '@ledgerhq/hw-transport-webhid'
import TransportWebUSB from '@ledgerhq/hw-transport-webusb'
import { LedgerFlutterTransport } from "./ledgerFlutterTransport";

export const getLedgerTransport = async () => {
    if (state.getState('ledgerFlutterTransport')) {
        return new LedgerFlutterTransport();
    }

    return await WebHidTransport.isSupported()
        ? await WebHidTransport.create(10000)
        : await TransportWebUSB.create(10000)
}
