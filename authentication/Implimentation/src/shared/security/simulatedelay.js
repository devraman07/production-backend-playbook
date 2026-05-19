export const simulateDelay = (ms = 800) => {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
};