define(["./defaultValue-81eec7ed","./Matrix2-7fbd2afb","./RuntimeError-8952249c","./EllipsoidOutlineGeometry-7f3a2bcb","./ComponentDatatype-be80d12c","./WebGLConstants-508b9636","./GeometryOffsetAttribute-8c5e10db","./Transforms-969e35b7","./_commonjsHelpers-3aae1032-26891ab7","./combine-3c023bda","./GeometryAttribute-6e58c1bc","./GeometryAttributes-32b29525","./IndexDatatype-a852edb7"],(function(e,i,t,n,o,r,s,a,d,l,c,u,m){"use strict";function p(t){const o=e.defaultValue(t.radius,1),r={radii:new i.Cartesian3(o,o,o),stackPartitions:t.stackPartitions,slicePartitions:t.slicePartitions,subdivisions:t.subdivisions};this._ellipsoidGeometry=new n.EllipsoidOutlineGeometry(r),this._workerName="createSphereOutlineGeometry"}p.packedLength=n.EllipsoidOutlineGeometry.packedLength,p.pack=function(e,i,t){return n.EllipsoidOutlineGeometry.pack(e._ellipsoidGeometry,i,t)};const b=new n.EllipsoidOutlineGeometry,y={radius:void 0,radii:new i.Cartesian3,stackPartitions:void 0,slicePartitions:void 0,subdivisions:void 0};return p.unpack=function(t,o,r){const s=n.EllipsoidOutlineGeometry.unpack(t,o,b);return y.stackPartitions=s._stackPartitions,y.slicePartitions=s._slicePartitions,y.subdivisions=s._subdivisions,e.defined(r)?(i.Cartesian3.clone(s._radii,y.radii),r._ellipsoidGeometry=new n.EllipsoidOutlineGeometry(y),r):(y.radius=s._radii.x,new p(y))},p.createGeometry=function(e){return n.EllipsoidOutlineGeometry.createGeometry(e._ellipsoidGeometry)},function(i,t){return e.defined(t)&&(i=p.unpack(i,t)),p.createGeometry(i)}}));