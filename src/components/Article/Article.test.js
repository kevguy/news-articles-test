import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Article from './Article';
import CardHeader from './CardHeader/CardHeader';
import CardContent from './CardContent/CardContent';

configure({adapter: new Adapter()});

describe('<Article />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Article article={{
      title: 'title',
      description: 'description',
      publishedAt: '2020-07-09T01:35:00Z',
      source: {
        id: 'the-washington-post',
        name: 'The Washington Post',
      },
      urlToImage: 'https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/ARVMVPVFDQI6VCMOWINZVA7XSI.jpg&w=1440',
    }}/>);
  });

  it('should render <CardHeader /> when receiving article', () => {
    expect(wrapper.find(CardHeader)).toHaveLength(1);
    expect(wrapper.find(CardContent)).toHaveLength(1);
  });
});
