import React, { Component } from 'react';
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <div>
            <div class="footer">
                <div class="float-right">
                    10GB of <strong>250GB</strong> Free.
            </div>
                <div>
                    <strong>Copyright</strong> Allicom insurance brokers &copy; 2019-2099
            </div>
            </div>
        </div> );
    }
}
 
export default Footer;