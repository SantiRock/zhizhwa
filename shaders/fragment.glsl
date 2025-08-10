    precision mediump float;

    uniform float u_time;
    uniform float u_speed;
    uniform float u_grosor;
    uniform float u_offline;
    uniform float u_large;
    uniform float u_twirl;
    uniform float u_radius;
    uniform float u_twirl_speed;
    uniform float u_r;
    uniform float u_g;
    uniform float u_b;

    varying vec2 v_uv;

    //vec3 color = vec3(0.5, 0.9, 0.8);
    vec2 center = vec2(0.5, 0.5);

    
    void main() {

        vec2 st = v_uv;

        // TWist

        float twirl = sin(u_time * u_twirl_speed - 4.7) * 13.;
        //float radius = sin(u_time * 0.001) * 2. + 2.;


        vec2 dir = st - center;
        float dist = length(dir);

        if (dist < u_radius) {
            float percent = (u_radius - dist) / u_radius;
            float angle = twirl * percent;

            float s = sin(angle);
            float c = cos(angle);
            
            dir = vec2(
                dir.x * c - dir.y * s,
                dir.s * s + dir.y * c
            );
            
            st = center + dir;
        };

        // Color

        //float offline = sin(u_time * 0.005) * 0.5 + 0.5;
         //float grosor = sin(u_time * 0.0001 - 1.5) * 1.5 + 3.5;
        st.y -= u_offline - 0.5;

        float t = mod(u_time * u_speed, 2.);
       
        float quadl = step(- u_large + t, st.x);
        float quadr = step(1. - t, u_large - st.x);
        float quadt = step(0.5 - u_grosor, 1. - st.y);
        float quadb = step(0.5 - u_grosor, st.y);
        vec3 quad = vec3(quadl * quadr * quadt * quadb);
        
        vec3 color = quad;
        vec3 tone = vec3(u_r, u_g, u_b);
        color *= tone;
    
        gl_FragColor = vec4(color, 1.);

    }