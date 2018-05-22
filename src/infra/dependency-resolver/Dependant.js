export const DEPEDENCY_WIRING_PREFIX = "wire-dependency";

export const Dependant = (baseElement) => class extends baseElement {
    connectedCallback() {
        super.connectedCallback();
        this._wireDependencies();
    }

    _wireDependencies() {}

    _wireDependency(dependencyRef, dependencyId) {
        const wireDependencyEvent = new CustomEvent(`${DEPEDENCY_WIRING_PREFIX}-${dependencyId}`, {
            detail: {
                dependency: dependencyRef
            },
            bubbles: true,
            composed: true
        });

        this.dispatchEvent(wireDependencyEvent);

        dependencyRef = wireDependencyEvent.detail.dependency;

        if (dependencyRef === undefined ||dependencyRef === null) {
            console.warn(`Dependency with idientifier: "${DEPEDENCY_WIRING_PREFIX}-${dependencyId}", was not wired`);
        }

        return dependencyRef;
    }
}