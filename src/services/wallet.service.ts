import { requestProvider, MissingProviderError, WebLNProvider } from 'webln';
import { store } from '../redux/store'
import { connectWallet as connectWalletStore } from '../redux/features/wallet.slice'
import { openModal } from 'src/redux/features/modals.slice';


class _Wallet_Service {

    isConnected = false;
    webln: WebLNProvider | null = null;

    async getWebln() {
        if (!this.isConnected) await this.connectWallet();
        return this.webln;
    }

    init() {
        // const connectedPreviously = localStorage.getItem('wallet-connected')
        // if (connectedPreviously)
        //     this.connectWallet();
    }

    async connectWallet() {
        try {
            const webln = await requestProvider();
            store.dispatch(connectWalletStore())
            this.webln = webln;
            this.isConnected = false;
        }
        catch (err: any) {
            // Default error message
            let message = "Check out https://getalby.com to get a web enabled lightning wallet";
            // If they didn't have a provider, point them to Joule
            if (err.constructor === MissingProviderError) {
                message = "Check out https://getalby.com to get a web enabled lightning wallet";
            }

            console.log(message);


            // Show the error (though you should probably use something better than alert!)
            store.dispatch(openModal({
                Modal: "NoWeblnModal"
            }))
        }
    }

}

const Wallet_Service = new _Wallet_Service()
export default Wallet_Service;

// export async function initWallet() {
//     const connectedPreviously = localStorage.getItem('wallet-connected')
//     if (connectedPreviously)
//         connectWallet();
// }



// export async function connectWallet() {
//     try {
//         const webln = await requestProvider();
//         store.dispatch(connectWalletStore(webln))
//         localStorage.setItem('wallet-connected', 'yes')
//     }
//     catch (err: any) {
//         // Default error message
//         let message = `Couldn't connect wallet`;
//         // If they didn't have a provider, point them to Joule
//         if (err.constructor === MissingProviderError) {
//             message = "Check out https://lightningjoule.com to get a WebLN provider";
//         }



//         localStorage.removeItem('wallet-connected')
//         // Show the error (though you should probably use something better than alert!)
//         alert(message);
//     }
// }




