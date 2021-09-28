import Demo from "./demo";

export default function Showcase() {
    return (
        <div>
            <Demo title="Handwriting" description="This model can interpret your handwriting!" iconImage="/handwritinglogo.jpg" hashtags={["Linear Regression", "Gradient Descent"]} link="handwriting"></Demo>
        </div>
    );
}