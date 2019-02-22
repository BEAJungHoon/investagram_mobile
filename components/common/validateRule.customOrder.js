import mask from 'json-mask';

export const setupState = (state, schema) => {
    let data = state.data;

    switch(data.type) {
        case 'stoploss':
            // Initiate state.data properties if not existing
            if(!data.hasOwnProperty('triggerPrice')) data.triggerPrice = '';
            if(!data.hasOwnProperty('orderPrice')) data.orderPrice = '';
            if(!data.hasOwnProperty('quantity')) data.quantity = '';

            // Delete unrelevant state.data properties
            delete data['stop'];
            delete data['buy'];
            delete data['sell'];
            break;
        case 'enterPosition':
            // Initiate state.data properties if not existing
            if(!data.hasOwnProperty('stop')) data.stop = '';
            if(!data.hasOwnProperty('buy')) data.buy = '';
            if(!data.hasOwnProperty('sell')) data.sell = '';
            if(!data.hasOwnProperty('quantity')) data.quantity = '';

            // Delete unrelevant state.data properties
            delete data['triggerPrice'];
            delete data['orderPrice'];
            break;
        default: break;
    }
    
    // Make masker in order to get adjusted schema
    let masker = [];
    Object.keys(data).forEach(key => {masker.push(key);});
    masker = masker.join(',');

    return {data: mask(data, masker), schema: mask(schema, masker)};
} 

export const handleChange_SearchableSelect = (name, value, _this) => {
    console.log('handleChange_SearchableSelect.name:', name);
    console.log('handleChange_SearchableSelect.value:', value);
    console.log('handleChange_SearchableSelect.this:', _this);

    let { data } = _this.state;

    switch (name) {
        case 'exchange':
            data = {};
            data[name] = value;
            if(value === '') {
                delete data.market;
                delete data.type;
            } else data['market'] = '';
            break;
        case 'market':
            data = {exchange: data.exchange};
            data[name] = value;
            if(value === '') {
                delete data.type;
            } else data['type'] = '';
            break;
        case 'type':
            data = {exchange: data.exchange, market: data.market};
            data[name] = value;
            break;
        default: break;
    }
    _this.setState({ data }, () => {
        console.log('state after handleChange:', _this.state)
        const errors = { ..._this.state.errors };
        const errorMessage = _this.validateProperty({name, value});
        if (errorMessage) errors[name] = errorMessage;
        else delete errors[name];
        _this.setState({ errors });
    });
};



export default {
    setupState,
    handleChange_SearchableSelect
};
