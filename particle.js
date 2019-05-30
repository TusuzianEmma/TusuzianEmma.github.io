function Person() {
    this.pos = createVector(50, height);
    this.vel = createVector();
    this.acc = createVector(0,0);

    this.applyForce = function force() {
    this.acc.add(force);
}

    function update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0,0);
}

    function display() {
    fill(255, 150);
    stroke(255);
    rect(this.pos.x, this.pos.y-50, 20, 50);
}

}