import React from "react";
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import NavigationItems from './NavigationItems'
import Item from './Item/Item'

configure({
    adapter: new Adapter()
})
describe(
    '<NavigationItems/>',
    () => {
        let wrapper = null;
        beforeEach(() => {
            wrapper = shallow(<NavigationItems/>)

        })
        it('should render two navigation elements', () => {
            expect(wrapper.find(Item)).toHaveLength(2);
        })
        it('should render 3 navigation elements', () => {
            wrapper.setProps({
                isAuth:true
            })
            expect(wrapper.find(Item)).toHaveLength(3);
        })
        it('should render logout element when authenticated', () => {
            wrapper.setProps({
                isAuth:true
            })
            expect(wrapper.contains( <Item link={'/logout'}>LOG OUT</Item> )).toEqual(true);
        })
    }
)