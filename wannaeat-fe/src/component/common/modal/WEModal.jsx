import WEAlertModal from "./WEAlertModal/WEAlertModal.jsx"
import WESheetModal from "./WESheetModal/WESheetModal.jsx"

const WEModal = ({modalType, alertText, cancelText, confirmText, close}) => {
    return (
        <div>
            {modalType == 'alert' ? <WEAlertModal alertText={alertText} cancelText={cancelText} confirmText={confirmText} close={close}/> : <WEAlertModal/>}
            {modalType == 'sheet' ? <WESheetModal close={close}/> : <WEAlertModal/>}

        </div>
    )
}

export default WEModal