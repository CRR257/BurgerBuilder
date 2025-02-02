import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
              this.setState({error: error})
            });
        }

        handleConfirmErrorMessage = () => {
            this.setState({error: null})
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        show = {this.state.error}
                        modalClosed = {this.handleConfirmErrorMessage} >
                        {this.state.error ? this.state.error.message : null} 
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default errorHandler;