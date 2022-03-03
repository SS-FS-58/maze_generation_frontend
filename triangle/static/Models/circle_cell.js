


function circle_cell(i, j) {
    this.circle_num = i;
    this.arc_num = j;
    // this.div_enable = false; //cicle columns == pre_columns * 2;
    this.size = m_cell_size;
    this.div_up_enable = false;
    this.div_down_enable = false;
    this.init();
   
    this.walls = [m_inner_wall_size, m_inner_wall_size,m_inner_wall_size, m_inner_wall_size, m_inner_wall_size];
    this.visited = false;
    this.neighbors = [];
    this.prev = undefined;
    this.getneighbors();

}

circle_cell.prototype.init = function () {
    m_criteria_x = m_cell_size * (m_height + 4);
    m_criteria_y = m_cell_height * (m_height + 4);
    this.radius = - m_cell_size / 2 + this.circle_num * m_cell_size; 
    this.arc_angle = pi;
    while(this.arc_angle >= 2 * m_cell_size / this.radius){
        this.arc_angle /= 2;
    }
    this.column_counter = 2 * pi /this.arc_angle;
    [this.x , this.y] = f_svg_dot([m_criteria_x, m_criteria_y],this.radius + m_cell_size / 2, this.arc_angle * this.arc_num, this.arc_angle / 2)

}


circle_cell.prototype.getneighbors = function() {
    // case 0: up and down rows arc angle same.
    this.neighbors = [[-1, 0], [0, -1], [1, 0], [1, 0], [0, 1]];
    // case 1: inner wall
    if (this.circle_num == m_innner_r){
        this.neighbors[0] = null;
        this.walls[0] = m_outter_wall_size;
    }else if ((this.radius - this.size) * this.arc_angle < this.size){ // up column counter is less.
        this.div_up_enable = true;
        this.neighbors[0][1] = - this.arc_num + Math.floor(this.arc_num / 2);
        
    }
    // case 2: outter wall
    if ( this.circle_num == m_height - 1){
        this.neighbors[2] = null;
        this.walls[2] = m_outter_wall_size;
        this.neighbors[3] = null;
        this.walls[3] = m_outter_wall_size;
    }else if ((this.radius + this.size) * this.arc_angle >= 2 * this.size){    //down column counter is big.
        this.div_down_enable = true;
        this.neighbors[2][1] = this.arc_num;
        this.neighbors[3][1] = this.arc_num + 1;
    }
    // case 3: arc_num == 0
    if ( this.arc_num == 0){
        this.neighbors[1][1] += this.column_counter;
    }
    // case 4: src_num == this.column_counter
    if ( this.arc_num == this.column_counter - 1){
        this.neighbors[4][1] -= this.column_counter;
    }
    // up column counter is less

}


var re_novisited;
circle_cell.prototype.getNotVisitedNeighbors = function() {
    // 
    re_novisited = [];
    for(var i=0; i < this.neighbors.length; i++){
      if(! this.div_down_enable && i == 3)
        continue;
      if(this.neighbors[i]!=null && cells[this.circle_num + this.neighbors[i][0]][this.arc_num + this.neighbors[i][1]].visited == false && i != this.prev)
      {
        re_novisited.push(this.neighbors[i]);
        if( ! this.div_down_enable && i == 3)
            re_novisited.pop();
      }
    }
  
    if( re_novisited.length == 0 )
        return null;
    else 
        return re_novisited;
      
}

circle_cell.prototype.selectNeighbor = function(){
    var re_neighbors = this.getNotVisitedNeighbors();
    if (re_neighbors == null)
        return null;
    var re_selectedneighbor = re_neighbors[Math.floor(Math.random() * re_neighbors.length)];

    // set next cell's prev
    for(var i=0; i < this.neighbors.length; i++){
        if(re_selectedneighbor == this.neighbors[i])
        {
            var prev_i = 0;
            switch( i ){
                case 0:
                    if ( this.arc_num % 2 == 0)
                        prev_i = 2;
                    else 
                        prev_i = 3;
                    break;
                case 1:
                    prev_i = 4;
                    break;
                case 4:
                    prev_i = 1;
                    break;
                                            
            }
            cells[this.circle_num + this.neighbors[i][0]][this.arc_num + this.neighbors[i][1]].prev = prev_i;
        break;
        }

      }
    return re_selectedneighbor;
}

circle_cell.prototype.removewall= function(next_neighbor, next){
    for (var j = 0; j < this.neighbors.length; j++) {
            if (this.neighbors[j] == next_neighbor) {
                this.walls[j] = 0;
                if( this.div_down_enable == false && (j == 2 || j == 3)){
                    this.walls[2] = 0 ;
                    this.walls[3] = 0 ; 
                }
                cells[next[0]][next[1]].walls[cells[next[0]][next[1]].prev] = 0;
                if (cells[next[0]][next[1]].div_down_enable == false && j == 0){
                    cells[next[0]][next[1]].walls[2] = 0;
                    cells[next[0]][next[1]].walls[3] = 0;
                }
                break;
            }
    }

}





circle_cell.prototype.draw_cell = function () {

    var lines = [];
    var counter = 0;
    var arcs = [];
    var arcs = [];
    var t1, delta;

    t1 = this.arc_num * this.arc_angle;
    delta = this.arc_angle ;
    arcs[0] = f_svg_ellipse_arc([m_criteria_x, m_criteria_y], [ this.radius,  this.radius], [t1, delta], 0);
    arcs[0].setAttribute("stroke-width", this.walls[0]);
    arcs[0].setAttribute("stroke", "black");
    arcs[0].setAttribute("fill", "none");
    svg.appendChild(arcs[0]);

    arcs[1] = f_svg_ellipse_arc([m_criteria_x, m_criteria_y], [ this.radius + m_cell_size,  this.radius + m_cell_size], [t1, delta / 2], 0);
    arcs[1].setAttribute("stroke-width", this.walls[2]);
    arcs[1].setAttribute("stroke", "black");
    arcs[1].setAttribute("fill", "none");
    svg.appendChild(arcs[1]);

    arcs[2] = f_svg_ellipse_arc([m_criteria_x, m_criteria_y], [ this.radius + m_cell_size,  this.radius + m_cell_size], [t1, delta / 2], delta / 2);
    arcs[2].setAttribute("stroke-width", this.walls[3]);
    arcs[2].setAttribute("stroke", "black");
    arcs[2].setAttribute("fill", "none");
    svg.appendChild(arcs[2]);

    lines[0] = f_svg_line_arc([m_criteria_x, m_criteria_y], [this.radius, this.radius + m_cell_size], t1 , 0);
    lines[0].setAttribute("stroke-width", this.walls[1]);
    lines[0].setAttribute("stroke", "black");
    lines[0].setAttribute("fill", "none");
    svg.appendChild(lines[0]);

    lines[1] = f_svg_line_arc([m_criteria_x, m_criteria_y], [this.radius, this.radius + m_cell_size], t1 , delta);
    lines[1].setAttribute("stroke-width", this.walls[4]);
    lines[1].setAttribute("stroke", "black");
    lines[1].setAttribute("fill", "none");
    svg.appendChild(lines[1]);
    
}    