import React from 'react';
import {shallow} from 'enzyme'
import {useDispatch, useSelector} from 'react-redux'
import {SearchCompoment} from '../search-component'

jest.mock('react-redux', () => {
    return {
        useDispatch: jest.fn(),
        useSelector: jest.fn()
    }
});

describe('<SearchComponent/>', () => {

    it('should be rendered', () => {
        const searchComponent = shallow(<SearchCompoment/>);
        console.log(searchComponent.debug());
    })
});
