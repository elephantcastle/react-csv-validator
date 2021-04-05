import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Reader from './Reader';


test('renders an input element', () => {
  const utils = render(<Reader/>)
  expect(utils.queryByTestId(/csv-input/i)).toBeTruthy();
});

test('Accept a csv file to be uploaded', () => {
  const utils = render(<Reader/>)
  const input  = utils.queryByTestId(/csv-input/i)

  const rows = ['AccountName,AccountValue', 'PETTY CASH,17269.51', 'CASH IN CURRENT A/C,1333.37']
  const file = new File([rows.join('\n')], 'some.csv',  { type: 'application/vnd.ms-excel' })
  fireEvent.change(input, {
    target: { files: [file] },
  });

  userEvent.upload(input, file)
  expect(input.files[0]).toStrictEqual(file)
  expect(input.files.item(0)).toStrictEqual(file)
  expect(input.files).toHaveLength(1)
});
