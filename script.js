document.addEventListener("DOMContentLoaded", () => {
    const getInputValue = (id) =>
        parseFloat(document.getElementById(id).value) || 0;

    const heronsFormula = (a, b, c) => {
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    };

    const ambiguousCase = (angleA, a, b) => {
        const h = b * Math.sin(angleA * (Math.PI / 180));

        if (angleA < 90) {
            if (a < h) return "No Triangle";
            if (a === h) return "Right Triangle";
            if (a > b) return "One Triangle";
            return "Two Triangles (Ambiguous Case)";
        }

        return a <= b ? "No Triangle" : "One Triangle";
    };

    const newtonsMethod = (g) => {
        const f = (x) => x ** 4 - 6 * x ** 3 + 13 * x ** 2 - 18 * x + 7;
        const fPrime = (x) => 4 * x ** 3 - 18 * x ** 2 + 26 * x - 18;
        return g - f(g) / fPrime(g);
    };

    const polynomialFunction = (coeffsStr, expsStr, x) => {
        const coeffs = coeffsStr.split(" ").map(Number);
        const exps = expsStr.split(" ").map(Number);
        let result = 0;
        const terms = coeffs.map((coeff, i) => {
            result += coeff * x ** exps[i];
            return `${coeff}x^${exps[i]}`;
        });
        return [`f(x) = ${terms.join(" + ")}`, `f(${x}) = ${result}`];
    };

    document
        .getElementById("heron-form")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            const a = getInputValue("heron-a");
            const b = getInputValue("heron-b");
            const c = getInputValue("heron-c");
            document.getElementById("heron-result").value = heronsFormula(
                a,
                b,
                c
            ).toFixed(2);
        });

    document
        .getElementById("ambiguous-form")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            const angleA = getInputValue("ambiguous-angle");
            const a = getInputValue("ambiguous-a");
            const b = getInputValue("ambiguous-b");
            document.getElementById("ambiguous-result").value = ambiguousCase(
                angleA,
                a,
                b
            );
        });

    document
        .getElementById("newton-form")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            const g = getInputValue("newton-guess");
            document.getElementById("newton-result").value =
                newtonsMethod(g).toFixed(4);
        });

    document.getElementById("poly-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const coeffs = document.getElementById("poly-coeffs").value;
        const exps = document.getElementById("poly-exps").value;
        const x = getInputValue("poly-x");

        const [formula, result] = polynomialFunction(coeffs, exps, x);
        document.getElementById("poly-result").value = result;
    });
});
