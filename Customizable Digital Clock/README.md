The reason for converting `minutes` and `seconds` to strings and using `padStart(2, "0")` is to ensure that these values are always displayed with **two digits**, even when they are less than 10.

### Explanation:

1. **`getMinutes()` and `getSeconds()` return numbers**:

    - `now.getMinutes()` returns the minutes part of the current time as a **number** (e.g., `5`, `23`, `42`).
    - `now.getSeconds()` returns the seconds part of the current time in the same way.

2. **Displaying time consistently**:

    - When displaying time in a digital clock format (like `hh:mm:ss`), it's standard to have two digits for minutes and seconds.
    - For example, if the current time is `09:05:07`, we want the time to display as `09:05:07` (with leading zeroes for single-digit minutes and seconds).
    - If the time was `9:5:7` (without leading zeroes), it would look inconsistent and visually incorrect.

3. **Using `toString()`**:

    - **`toString()`** is used to convert the numeric values (minutes and seconds) into string format, as `padStart()` is a string method, not a number method.
    - For example, `5.toString()` gives `"5"`, and `42.toString()` gives `"42"`.

4. **Using `padStart(2, "0")`**:
    - **`padStart(2, "0")`** ensures that the string is always at least **2 characters long**, padding it with a `"0"` if necessary.
    - So, for example:
        - If `minutes` is `5`, `5.toString()` results in `"5"`, and `padStart(2, "0")` converts it to `"05"`.
        - If `seconds` is `7`, `7.toString()` results in `"7"`, and `padStart(2, "0")` converts it to `"07"`.
    - If the number is already two digits (e.g., `23`), the `padStart` function does nothing because it already meets the required length.

### Example:

-   **Before padding**:
    -   `minutes = 5`, `seconds = 7`
-   **After converting to strings and padding**:
    -   `minutes = "05"`, `seconds = "07"`

This ensures that the final clock output will always have a consistent format like `hh:mm:ss`, even for single-digit values.

### Why is it important?

If you didn't convert and pad the values, the clock could display times in inconsistent formats:

-   `9:5:7` (without padding) would look wrong and might confuse the user.
-   We need a **uniform format** like `09:05:07` to make it easy to read and visually appealing.

In summary, converting the minutes and seconds to strings and padding them ensures the clock always shows time in a clean, consistent two-digit format.
