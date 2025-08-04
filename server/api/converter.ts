export default defineEventHandler(async (event) => {
    // const currencyData = await $fetch('https://www.floatrates.com/daily/ngn.json')

    const currencyData = {
            "aud": {
                "code": "AUD",
                "name": "Austrialian Dollar",
                "rate": 0.0010061185208908,
                "inverseRate": 993.91868774531
            },
            "cad": {
                "code": "CAD",
                "name": "Canadian Dollar",
                "rate": 0.00089834256753865,
                "inverseRate": 1113.1610992674
            },
            "usd": {
                "code": "USD",
                "name": "United State Dollar",
                "rate": 0.0006520009947173,
                "inverseRate": 1533.7399913532
            },

        }
    return currencyData;
})