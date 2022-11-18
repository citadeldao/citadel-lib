import Transport from "@ledgerhq/hw-transport";

export class LedgerFlutterTransport extends Transport {
    async exchange(_apdu) {
        const result = await window.flutter_inappwebview.callHandler('ledgerFlutterTransportExchange', _apdu);
        return Buffer.from(result);
    }
}
