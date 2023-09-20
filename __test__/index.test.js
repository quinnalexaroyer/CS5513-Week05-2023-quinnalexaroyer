import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import {getSortedList} from '../lib/data';

const presidentsData = getSortedList();

it('renders homepage unchanged', () => {
  const { container } = render(<Home />)
  expect(container).toMatchSnapshot()
})

describe('Home', () => {
  it('renders a list', () => {
    render(<Home presidentsData={presidentsData} />);
    expect(document.querySelector("#listOfPresidents")).toBeTruthy();
    expect(document.querySelector("#listOfPresidents").children.length).toEqual(46);
  })
  it('should fail: test has wrong number of items', () => {
    render(<Home />)
    expect(document.querySelector("#listOfPresidents")).toBeTruthy();
    expect(document.querySelector("#listOfPresidents").children.length).toEqual(32);
  })
})