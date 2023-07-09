import axios from 'axios';
import InputPrompt from '../src/components/InputPrompt';
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

jest.mock('axios'); // Mock axios module

describe('InputPrompt component', () => {
  test('renders input prompt and submit button', () => {
    render(<InputPrompt setFocusImage={jest.fn()} setImageList={jest.fn()} />);

    const promptLabel = screen.getByText('AI Meme Generator');
    const input = screen.getByPlaceholderText('Enter prompt...');
    const submitButton = screen.getByText('Submit');

    expect(promptLabel).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('updates input value correctly', () => {
    render(<InputPrompt setFocusImage={jest.fn()} setImageList={jest.fn()} />);

    const input = screen.getByPlaceholderText('Enter prompt...');

    fireEvent.change(input, { target: { value: 'Test prompt' } });

    expect(input.value).toBe('Test prompt');
  });

  test('calls handleSubmit when submit button is clicked', async () => {
    const setFocusImage = jest.fn();
    const setImageList = jest.fn();
    render(<InputPrompt setFocusImage={setFocusImage} setImageList={setImageList} />);
  
    const input = screen.getByPlaceholderText('Enter prompt...');
    const submitButton = screen.getByText('Submit');
  
    const inputValue = 'Test prompt';
    fireEvent.change(input, { target: { value: inputValue } }); // Set non-empty input value
  
    // Mock the axios POST request
    const mockResponse = {
      status: 200,
      data: {
        urlExtension: '/mocked-url.jpg',
      },
    };
    axios.post.mockResolvedValue(mockResponse);
  
    fireEvent.click(submitButton);
  
    // Wait for the asynchronous operations to complete
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve)); // Wait for microtasks to flush
    });
  
    expect(setFocusImage).toHaveBeenCalled();
    expect(setImageList).toHaveBeenCalled();
  
    // Wait for the screen to update and show the text 'AI Meme Generator'
    await screen.findByText('AI Meme Generator');
  });
});
