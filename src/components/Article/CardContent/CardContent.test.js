import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CardContent from './CardContent';

configure({adapter: new Adapter()});

describe('<CardContent />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardContent title={'title'} content={'content'}/>);
  });

  it('should render title and content', () => {
    // wrapper.setProps({title: 'title', content: 'content'});
    expect(wrapper.find('h2')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
  });
});
