import useModalStore from "../../../stores/modal/useModalStore.js"
import WEAlertModal from "./WEAlertModal/WEAlertModal.jsx"
import WESheetModal from "./WESheetModal/WESheetModal.jsx"

const WEModal = () => {
    const {modalType} = useModalStore();
    return (
        <div>
            {modalType === 'alert' ? <WEAlertModal/> : <></>}
            {modalType === 'sheet' ? <WESheetModal/> : <></>}

        </div>
    )
}

export default WEModal