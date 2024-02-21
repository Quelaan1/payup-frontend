// @ts-ignore
import { renderRouter, screen } from 'expo-router/testing-library';
import {CommonButton} from "../../../components";

it('my-test', async () => {
    const mockOnPress = () => {
        console.log("Pressed")
    }

    const MockComponent = jest.fn(() => <CommonButton  onPress={mockOnPress} text={"Mocking text"}/>);

    renderRouter(
        {
            index: MockComponent,
            'directory/a': MockComponent,
            '(group)/b': MockComponent,
        },
        {
            initialUrl: '/directory/a',
        }
    );

    expect(screen).toHavePathname('/directory/a');
});
