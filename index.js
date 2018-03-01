/**
 * @file   mofron-comp-modalform/index.js
 * @brief  form component that has modal sending function for mofron
 * @author simpart
 */
let mf      = require('mofron');
let Form    = require('mofron-comp-form');
let Loading = require('mofron-comp-loading');

/**
 * @class mofron.comp.ModalForm
 * @brief modal form component class
 */
mf.comp.ModalForm = class extends Form {
    
    constructor (po) {
        try {
            super();
            this.name('ModalForm');
            this.prmOpt(po);
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @param mgn : (number) margin value
     * @param cnt : (number) center rate
     */
    initDomConts (mgn, cnt) {
        try {
            super.initDomConts(mgn, cnt);
            
            super.sendEvent(
                (fm) => {
                    try {
                        fm.loading().visible(true);
                        let evt = fm.sendEvent(undefined, undefined, true);
                        if (null !== evt[0]) {
                            evt[0](fm, evt[1]);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                },
            );
            
            super.callback(
                (res,fm) => {
                    try {
                        fm.loading().visible(false);
                        let cb = fm.callback(undefined, undefined, true);
                        if (null != cb[0]) {
                            cb[0](res, fm, cb[1]);
                        }
                    } catch (e) {
                        console.error(e.stack);
                        throw e;
                    }
                }
            );
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    send () {
        try {
            this.isSending(true);
            let ret = super.send();
            this.isSending(false);
            return ret;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    isSending (val) {
        try {
            if (undefined === val) {
                /* getter */
                return (undefined === this.m_is_sending) ? false : this.m_is_sending;
            }
            /* setter */
            if ('boolean' !== typeof val) {
                throw new Error('invalid parameter');
            }
            this.m_is_sending = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    sendEvent (func, prm, flg) {
        try {
            if ((true === this.isSending()) && (true !== flg)) {
                return super.sendEvent(func, prm);
            }
            if (undefined === func) {
                /* getter */
                return (undefined === this.m_sendevt_buf) ? new Array(null,null) : this.m_sendevt_buf;
            }
            /* setter */
            if ('function' !== typeof func) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_sendevt_buf) {
                this.m_sendevt_buf = new Array(null,null);
            }
            this.m_sendevt_buf[0] = func;
            this.m_sendevt_buf[1] = (undefined === prm) ? null : prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    callback (func, prm, flg) {
        try {
            if ((true === this.isSending()) && (true !== flg)) {
                return super.callback(func, prm);
            }
            if (undefined === func) {
                /* getter */
                return (undefined === this.m_callback_buf) ? new Array(null,null) : this.m_callback_buf;
            }
            /* setter */
            if ('function' !== typeof func) {
                throw new Error('invalid parameter');
            }
            if (undefined === this.m_callback_buf) {
                this.m_callback_buf = new Array(null,null);
            }
            this.m_callback_buf[0] = func;
            this.m_callback_buf[1] = (undefined === prm) ? null : prm;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    loading (val) {
        try {
            if (undefined === val) {
                /* getter */
                if (undefined === this.m_loading) {
                    this.loading(
                        new Loading({
                            text : 'Sending...'
                        })
                    );
                }
                return this.m_loading;
            }
            /* setter */
            if (true !== mf.func.isInclude(val, 'Loading')) {
                throw new Error('invalid paramter');
            }
            this.m_loading = val;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
}
module.exports = mofron.comp.ModalForm;
