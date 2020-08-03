import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NewsResult} from "./NewsResult";
import Spinner from 'components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

describe('<NewsResult />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NewsResult onFetchNewsData={() => {}} filteredResult={[]} />);
  });

  it('should render <Spinner /> when data is still loading', () => {
    wrapper.setProps({loading: true});
    expect(wrapper.find(Spinner)).toHaveLength(1);
  });
});
