import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';

mobiscroll.settings = {
    theme: 'ios',
    themeVariant: 'light'
};

const btn = [
    'set',
    {
        text: 'Custom',
        icon: 'checkmark',
        handler: function (event, inst) {
            inst.hide();
            mobiscroll.toast({
                message: ' Custom button clicked'
            });
        }
    },
    'cancel'
];

class App extends React.Component {
    showNoButtons = () => {
        this.refs.noButtons.instance.show();
    }
    
    showDefault= () => {
        this.refs.defaultButton.instance.show();
    }
    
    showCustom = () => {
        this.refs.customButtons.instance.show();
    }
    
    render() {
        return (
            <div>
                <mobiscroll.Form>
                    <mobiscroll.FormGroup>
                        <div className="mbsc-btn-group-block">
                            <mobiscroll.Button id="showNoButtons" onClick={this.showNoButtons}>No buttons</mobiscroll.Button>
                            <mobiscroll.Button id="showDefault" onClick={this.showDefault}>Default</mobiscroll.Button>
                           <mobiscroll.Button id="showCustom" onClick={this.showCustom}>Custom buttons</mobiscroll.Button>
                        </div>
                    </mobiscroll.FormGroup>
                </mobiscroll.Form>
                
                <mobiscroll.Popup 
                    ref="noButtons"
                    display="center"
                    buttons={[]}
                >
                    <div className="mbsc-align-center mbsc-padding">
                        <h3 className="md-text-center">Hi!</h3>
                        <p className="md-text-center">This is a popup with no buttons</p>
                    </div>
                </mobiscroll.Popup>
                
                 <mobiscroll.Popup 
                    ref="defaultButton"
                    display="center"
                >
                    <div className="mbsc-align-center mbsc-padding">
                        <h3 className="md-text-center">Hi there!</h3>
                        <p className="md-text-center">This is a popup with default button</p>
                    </div>
                </mobiscroll.Popup>
                
                 <mobiscroll.Popup 
                    ref="customButtons"
                    display="center"
                    buttons={btn}
                >
                    <div className="mbsc-align-center mbsc-padding">
                        <h3 className="md-text-center">Hi again!</h3>
                        <p className="md-text-center">This is a popup with three custom buttons</p>
                    </div>
                </mobiscroll.Popup>
            </div>
        );
    }    
}

