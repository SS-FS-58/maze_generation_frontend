

function generateshape() {
    var flag = document.getElementById('ShapeDropDownList').value;
    solved = document.getElementById('solved')
    if (flag == 1) {
        var S1TesselationDropDownList = parseFloat(document.getElementById("S1TesselationDropDownList").value);
        m_width = parseFloat(document.getElementById("S1WidthTextBox").value);
        m_height = parseFloat(document.getElementById("S1HeightTextBox").value);
        m_cell_size = parseFloat(document.getElementById("S1PathWidthTextBox").value);
        m_inner_wall_size = parseFloat(document.getElementById("S1WallWidthTextBox").value);
        m_outter_wall_size = parseFloat(document.getElementById("S1OuterWidthTextBox").value);
        if(S1TesselationDropDownList == 1)
             m_shape_type = "Rectangular_squ";
        else if(S1TesselationDropDownList == 2)
            m_shape_type = "Rectangular_hex";
        else if(S1TesselationDropDownList == 3)
            m_shape_type = "Rectangular_tri";

    }
    if (flag == 2) {

        m_height = parseFloat(document.getElementById("S2OuterDiameterTextBox").value);
        m_width = m_height;
        m_innner_r = parseFloat(document.getElementById("S2InnerDiameterTextBox").value);
        m_cell_size = parseFloat(document.getElementById("S2PathWidthTextBox").value);
        m_path_width = parseFloat(document.getElementById("S2WallWidthTextBox").value);
        m_inner_wall_size = m_path_width;
        m_outter_wall_size = parseFloat(document.getElementById("S2OuterWidthTextBox").value);
        m_shape_type = "Circle_shape";
        // mazegenerate();

    }
    else if (flag == 3) {
        m_height = parseFloat(document.getElementById("S3SideLengthTextBox").value);
        m_width = m_height;
        m_innner_r = parseFloat(document.getElementById("S3InnerSideLengthTextBox").value);
        m_cell_size = parseFloat(document.getElementById("S3PathWidthTextBox").value);
        m_path_width = parseFloat(document.getElementById("S3WallWidthTextBox").value);
        m_outter_wall_size = parseFloat(document.getElementById("S3OuterWidthTextBox").value);
        m_shape_type = "Triangular";

    }
    else if (flag == 4) {

        var S4TesselationDropDownList = parseFloat(document.getElementById("S4TesselationDropDownList").value);
        m_height = parseFloat(document.getElementById("S4SideLengthTextBox").value);
        m_width = m_height;
        m_innner_r = parseFloat(document.getElementById("S4InnerSideLengthTextBox").value);
        m_cell_size = parseFloat(document.getElementById("S4PathWidthTextBox").value);
        m_path_width = parseFloat(document.getElementById("S4WallWidthTextBox").value);
        m_outter_wall_size = parseFloat(document.getElementById("S4OuterWidthTextBox").value);
        if(S4TesselationDropDownList == 2)
            m_shape_type = "Hexagonal_hex";
        else
            m_shape_type = "Hexagonal_tri";
    }
    mazegenerate();
}

function shapeChange(val) {
    Rectangular
    var Rectangular = document.getElementsByName('Rectangular');
    var circle = document.getElementsByName('circle');
    var triangular = document.getElementsByName('triangular');
    var Hexagonal = document.getElementsByName('Hexagonal');
    if (val == 1) {
        for (var i = 0; i < Rectangular.length; i += 1) {
            Rectangular[i].style.display = 'block';
        }
        for (var i = 0; i < circle.length; i += 1) {
            circle[i].style.display = 'none';
        }
        for (var i = 0; i < triangular.length; i += 1) {
            triangular[i].style.display = 'none';
        }
        for (var i = 0; i < Hexagonal.length; i += 1) {
            Hexagonal[i].style.display = 'none';
        }
    }
    if (val == 2) {
        console.log('circle');
        for (var i = 0; i < circle.length; i += 1) {
            circle[i].style.display = 'block';
        }
        for (var i = 0; i < Rectangular.length; i += 1) {
            Rectangular[i].style.display = 'none';
        }
        for (var i = 0; i < triangular.length; i += 1) {
            triangular[i].style.display = 'none';
        }
        for (var i = 0; i < Hexagonal.length; i += 1) {
            Hexagonal[i].style.display = 'none';
        }
    }
    else if (val == 3) {
        for (var i = 0; i < triangular.length; i += 1) {
            triangular[i].style.display = 'block';
        }
        for (var i = 0; i < Rectangular.length; i += 1) {
            Rectangular[i].style.display = 'none';
        }
        for (var i = 0; i < circle.length; i += 1) {
            circle[i].style.display = 'none';
        }
        for (var i = 0; i < Hexagonal.length; i += 1) {
            Hexagonal[i].style.display = 'none';
        }
    }
    else if (val == 4) {
        for (var i = 0; i < Hexagonal.length; i += 1) {
            Hexagonal[i].style.display = 'block';
        }
        for (var i = 0; i < Rectangular.length; i += 1) {
            Rectangular[i].style.display = 'none';
        }
        for (var i = 0; i < circle.length; i += 1) {
            circle[i].style.display = 'none';
        }
        for (var i = 0; i < triangular.length; i += 1) {
            triangular[i].style.display = 'none';
        }
    }
}