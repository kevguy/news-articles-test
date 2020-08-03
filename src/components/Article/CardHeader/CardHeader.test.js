import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import CardHeader from './CardHeader';
import Avatar from './Avatar/Avatar';

configure({adapter: new Adapter()});

describe('<CardHeader />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CardHeader publisher={'The Washing Post'} publishTime={'2020-07-09T21:33:00Z'} />);
  });

  it('should render <Avatar />', () => {
    expect(wrapper.find(Avatar)).toHaveLength(1);
  })

});
