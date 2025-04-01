document.addEventListener("DOMContentLoaded", () => {
    const getInputValue = (id) =>
        parseFloat(document.getElementById(id).value) || 0;

    // Heron's Formula with triangle inequality check
    const heronsFormula = (a, b, c) => {
        // Validate the triangle inequality
        if (a + b <= c || a + c <= b || b + c <= a) {
            return NaN;
        }
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    };

    // Ambiguous case for SSA triangles with tolerance for floating point comparison
    const ambiguousCase = (angleA, a, b) => {
        const epsilon = 1e-10;
        // Calculate the height from angleA using side b
        const h = b * Math.sin(angleA * (Math.PI / 180));

        if (angleA < 90) {
            if (a < h) return "No Triangle";
            if (Math.abs(a - h) < epsilon) return "Right Triangle";
            if (a >= b) return "One Triangle"; // Now includes a === b case
            return "Two Triangles (Ambiguous Case)";
        }

        // For angleA >= 90, the side opposite the angle must be the longest
        return a > b ? "One Triangle" : "No Triangle";
    };

    // Newton's Method now iterates until convergence
    const newtonsMethod = (
        initialGuess,
        tolerance = 1e-7,
        maxIterations = 100
    ) => {
        const f = (x) => x ** 4 - 6 * x ** 3 + 13 * x ** 2 - 18 * x + 7;
        const fPrime = (x) => 4 * x ** 3 - 18 * x ** 2 + 26 * x - 18;
        let x = initialGuess;
        for (let i = 0; i < maxIterations; i++) {
            const fx = f(x);
            const fpx = fPrime(x);
            if (Math.abs(fpx) < tolerance) break; // Avoid division by near-zero
            const nextX = x - fx / fpx;
            if (Math.abs(nextX - x) < tolerance) return nextX;
            x = nextX;
        }
        return x;
    };

    // Evaluate a polynomial given coefficients and exponents as space-separated strings
    const polynomialFunction = (coeffsStr, expsStr, x) => {
        const coeffs = coeffsStr.trim().split(/\s+/).map(Number);
        const exps = expsStr.trim().split(/\s+/).map(Number);
        let result = 0;
        const terms = coeffs.map((coeff, i) => {
            result += coeff * x ** exps[i];
            return `${coeff}x^${exps[i]}`;
        });
        return [`f(x) = ${terms.join(" + ")}`, `f(${x}) = ${result}`];
    };

    // Event listener for Heron's Formula form
    document
        .getElementById("heron-form")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            const a = getInputValue("heron-a");
            const b = getInputValue("heron-b");
            const c = getInputValue("heron-c");
            const area = heronsFormula(a, b, c);
            document.getElementById("heron-result").value = isNaN(area)
                ? "Invalid Triangle"
                : area.toFixed(2);
        });

    // Event listener for the ambiguous case form
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

    // Event listener for Newton's Method form
    document
        .getElementById("newton-form")
        .addEventListener("submit", (event) => {
            event.preventDefault();
            const guess = getInputValue("newton-guess");
            const root = newtonsMethod(guess);
            document.getElementById("newton-result").value = root.toFixed(4);
        });

    // Event listener for the polynomial function form
    document.getElementById("poly-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const coeffs = document.getElementById("poly-coeffs").value;
        const exps = document.getElementById("poly-exps").value;
        const x = getInputValue("poly-x");

        const [formula, result] = polynomialFunction(coeffs, exps, x);
        // Currently only outputting the numerical result; formula is available if needed
        document.getElementById("poly-result").value = result;
    });
});
