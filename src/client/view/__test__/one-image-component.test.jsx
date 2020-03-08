import * as React from 'react';
import {shallow} from 'enzyme'
import {useDispatch, useSelector} from 'react-redux';
import {getNextArrayId, getPrevArrayId, isAuthorUpdateRequestPending} from "../app-selectors";
import {OneImageComponent} from "../one-image-component";

jest.mock('react-redux', () => {
    return {
        useSelector: jest.fn(),
        useDispatch: jest.fn()
    }
});

describe('<OneImageComponent/>', () => {

    const setAuthorEditModeSpy = jest.fn();
    const setImageFullyLoadedSpy = jest.fn();
    const setCurrentAuthorSpy = jest.fn();
    const setCurrentTimeoutSpy = jest.fn();
    const setCurrentIdSpy = jest.fn();

    const useSelectorMap = {
        [getNextArrayId]: 1,
        [getPrevArrayId]: 2,
        [isAuthorUpdateRequestPending]: false
    };

    const useRefSpy = jest.spyOn(React, "useRef");
    const useStateSpy = jest.spyOn(React, "useState");
    const useEffectSpy = jest.spyOn(React, "useEffect");
    const dispatchSpy = jest.fn();

    beforeEach(() => {
        jest.useFakeTimers();

        useStateSpy
            .mockImplementationOnce(() => [false, setAuthorEditModeSpy])
            .mockImplementationOnce(() => [false, setImageFullyLoadedSpy])
            .mockImplementationOnce(() => ["fake author", setCurrentAuthorSpy])
            .mockImplementationOnce(() => [null, setCurrentTimeoutSpy])
            .mockImplementationOnce(() => ["fake id", setCurrentIdSpy]);

        useRefSpy.mockReturnValue({current: {}} );
        useSelector.mockImplementation((selectorfn) => useSelectorMap[selectorfn]);
        useDispatch.mockImplementation(() => dispatchSpy);

        jest.clearAllMocks();
    });

    const props = {
        image: {
            id: "abc",
            author: "fake_author",
            width: 1280,
            height: 1024
        }
    };

    it('should be rendered', () => {
        //when
        const oneImageComponentEl = shallow(<OneImageComponent {...props}/>);

        //then
        expect(oneImageComponentEl).toMatchSnapshot();
    });

    it('should handle useEffect', () => {
        //TODO
        //To mock new Image getNewImage function should be delegated to other module
        //then such module should be mocked here

        //given
        shallow(<OneImageComponent {...props}/>);
        const useEffectHandleFn = useEffectSpy.mock.calls[0][0];

        //when
        useEffectHandleFn();
        const setTimeoutHandler = setTimeout.mock.calls[0][0];
        setTimeoutHandler();

        //then
        expect(setCurrentTimeoutSpy).toHaveBeenCalledWith(expect.any(Number));
    })
});
