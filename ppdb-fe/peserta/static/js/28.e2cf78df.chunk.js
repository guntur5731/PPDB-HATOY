(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[28],{117:function(e,t,a){"use strict";a.d(t,"d",(function(){return n})),a.d(t,"b",(function(){return c})),a.d(t,"c",(function(){return r})),a.d(t,"g",(function(){return s})),a.d(t,"a",(function(){return i})),a.d(t,"e",(function(){return o})),a.d(t,"f",(function(){return l}));var n="/login",c="/jurusan",r="/kelas",s="/tahun-ajaran",i="/jenis-pembayaran",o="/master-bayaran",l="/master-bayaran/list"},181:function(e,t,a){"use strict";var n=a(1),c=a.n(n),r=a(0),s=a.n(r);function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},i.apply(this,arguments)}function o(e,t){if(null==e)return{};var a,n,c=function(e,t){if(null==e)return{};var a,n,c={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(c[a]=e[a]);return c}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(c[a]=e[a])}return c}var l=Object(n.forwardRef)((function(e,t){var a=e.color,n=void 0===a?"currentColor":a,r=e.size,s=void 0===r?24:r,l=o(e,["color","size"]);return c.a.createElement("svg",i({ref:t,xmlns:"http://www.w3.org/2000/svg",width:s,height:s,viewBox:"0 0 24 24",fill:"none",stroke:n,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},l),c.a.createElement("polyline",{points:"6 9 12 15 18 9"}))}));l.propTypes={color:s.a.string,size:s.a.oneOfType([s.a.string,s.a.number])},l.displayName="ChevronDown",t.a=l},680:function(e,t,a){"use strict";a.r(t);var n=a(7),c=a(14),r=a(20),s=a(120),i=a.n(s),o=a(181),l=a(1),u=a(2),j=a.n(u),d=a(97),b=a(117),h=a(149),f=a(111),O=a(26),m=a(3);t.default=function(){var e=Object(f.g)(),t=Object(l.useState)([]),a=Object(c.a)(t,2),s=a[0],u=a[1],p=Object(l.useState)(!1),x=Object(c.a)(p,2),g=x[0],v=x[1],w=Object(l.useState)([]),y=Object(c.a)(w,2),C=y[0],k=y[1],N=Object(l.useState)(""),S=Object(c.a)(N,2),T=S[0],A=S[1],K=Object(l.useState)([]),L=Object(c.a)(K,2),E=L[0],P=L[1],R=Object(l.useState)([]),B=Object(c.a)(R,2),D=B[0],F=B[1],_=Object(l.useState)([]),z=Object(c.a)(_,2),I=z[0],M=z[1],W=Object(l.useState)({idTahunAjaran:"",tipeKelas:"",listBayaran:[]}),q=Object(c.a)(W,2),J=q[0],U=q[1],H=Object(l.useState)(null),V=Object(c.a)(H,2),G=V[0],Q=V[1],X=Object(l.useState)({idTahunAjaran:"",tipeKelas:""}),Y=Object(c.a)(X,2),Z=Y[0],$=Y[1],ee=Object(l.useState)(!1),te=Object(c.a)(ee,2),ae=te[0],ne=te[1],ce=Object(l.useState)(!1),re=Object(c.a)(ce,2),se=re[0],ie=re[1],oe=function(){Object(d.a)(b.e).then((function(e){e.data.data&&e.data.data.length>0&&u(e.data.data)})).catch((function(e){console.log(e)}))},le=function(){U({idTahunAjaran:"",tahunAjaran:"",keterangan:"",status:!0}),ne(!1)},ue=function(){v(!g),U({idTahunAjaran:"",tipeKelas:"",listBayaran:[]}),$({idTahunAjaran:"",tipeKelas:""})},je=function(){if(""===J.idTahunAjaran||""===J.tipeKelas)O.b.error("Kolom wajib diisi"),$({idTahunAjaran:"Field is required",tipeKelas:"Field is required"});else{var e=J;e.listBayaran=I,ie(!0),ae?Object(d.b)(b.g,J).then((function(e){le(),oe(),console.log(e),ie(!1),O.b.success("Sukses Update Data")})).catch((function(e){console.log(e),ie(!1),O.b.error("Internal Server Error")})):Object(d.c)(b.e,e).then((function(e){O.b.success("Sukses Menyimpan Data"),console.log(e),ue(),ie(!1)})).catch((function(e){console.log(e),ie(!1),O.b.error("Internal Server Error")}))}};return Object(l.useEffect)((function(){u([]),oe(),Object(d.a)(b.g).then((function(e){if(e.data.data&&e.data.data.length>0){var t=[];e.data.data.forEach((function(e){t.push({value:e.id_tahun,label:e.tahun_ajaran,allData:e})})),P(t)}})).catch((function(e){console.log(e)})),Object(d.a)(b.c).then((function(e){if(e.data.data&&e.data.data.length>0){var t=[];e.data.data.forEach((function(e){t.push({value:e.id_type,label:e.nama,allData:e})})),F(t)}})).catch((function(e){console.log(e)})),Object(d.a)(b.a).then((function(e){if(e.data.data&&e.data.data.length>0){var t=[];e.data.data.forEach((function(e){t.push({id:e.id_jenis_pem,label:e.keterangan,value:""})})),M(t),console.log(t)}})).catch((function(e){console.log(e)}))}),[]),Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(r.d,{children:[Object(m.jsx)(r.f,{children:Object(m.jsxs)(r.h,{children:["Master Bayaran",Object(m.jsx)("p",{}),Object(m.jsx)(r.c.Ripple,{onClick:function(){e.push("".concat(window.location.pathname,"/add"))},color:"primary",children:"Tambah Master Bayaran"})]})}),Object(m.jsx)(r.e,{style:{display:"none"},children:Object(m.jsxs)(r.C,{className:"justify-content-between align-items-center",children:[Object(m.jsxs)(r.i,{md:2,className:"mb-md-0 mb-1",children:[Object(m.jsx)(r.s,{className:"form-label",children:"Tahun Ajaran"}),Object(m.jsx)(r.p,{type:"text",value:J.tahunAjaran,invalid:""!==Z.tahunAjaran&&!0,onChange:function(e){$(Object(n.a)(Object(n.a)({},Z),{},{tahunAjaran:""})),U(Object(n.a)(Object(n.a)({},J),{},{tahunAjaran:e.target.value}))},placeholder:"Tahun Ajaran"})]}),Object(m.jsxs)(r.i,{md:4,className:"mb-md-0 mb-1",children:[Object(m.jsx)(r.s,{className:"form-label",children:"Keterangan"}),Object(m.jsx)(r.p,{type:"text",value:J.keterangan,onChange:function(e){U(Object(n.a)(Object(n.a)({},J),{},{keterangan:e.target.value}))},placeholder:"Keterangan"})]}),Object(m.jsxs)(r.i,{md:2,className:"mb-md-0 mb-1",children:[Object(m.jsx)(r.s,{className:"form-label",children:"Status"}),Object(m.jsx)("div",{className:"form-check form-switch",children:Object(m.jsx)(r.p,{type:"switch",name:"customSwitch",id:"exampleCustomSwitch",checked:J.status,onChange:function(e){U(Object(n.a)(Object(n.a)({},J),{},{status:e.target.checked}))}})})]}),Object(m.jsxs)(r.i,{md:3,className:"mt-2",children:[Object(m.jsx)(r.c,{disabled:se,onClick:function(){return je()},color:"primary",className:"text-nowrap px-1",style:{marginRight:"10px"},children:se?Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(r.D,{size:"sm"})," Loading "]}):ae?Object(m.jsx)("span",{children:"Update"}):Object(m.jsx)("span",{children:"Simpan"})}),ae&&Object(m.jsx)(r.c,{disabled:se,onClick:function(){return le()},color:"danger",outline:!0,className:"text-nowrap px-1",children:se?Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(r.D,{size:"sm"})," Loading "]}):Object(m.jsx)("span",{children:"Batal"})})]})]})})]}),Object(m.jsx)(r.d,{children:Object(m.jsx)(r.e,{children:Object(m.jsxs)(r.C,{className:"",children:[Object(m.jsxs)(r.i,{lg:"3",md:"6",className:"mb-1 justify-content-end align-items-end",children:[Object(m.jsx)(r.s,{className:"form-label",for:"cari",children:"Filter:"}),Object(m.jsx)(r.p,{id:"cari",placeholder:"Filter...",onChange:function(e){return function(e){var t=[],a=e.target.value;a.length&&(t=s.filter((function(e){var t=e.tahun_ajaran.toLowerCase().startsWith(a.toLowerCase())||e.keterangan.toLowerCase().startsWith(a.toLowerCase()),n=e.tahun_ajaran.toLowerCase().includes(a.toLowerCase())||e.keterangan.toLowerCase().includes(a.toLowerCase());return t||(!t&&n?n:null)})),k(t),A(a))}(e)}})]}),Object(m.jsx)(r.i,{md:12,sm:12,children:Object(m.jsx)("div",{className:"react-dataTable",children:Object(m.jsx)(i.a,{noHeader:!0,pagination:!0,data:T.length?C:s,columns:[{name:"Tahun Ajaran",sortable:!0,selector:function(e){return e.tahunAjaran}},{name:"Keterangan",sortable:!0,selector:function(e){return e.keterangan}}],className:"react-dataTable",sortIcon:Object(m.jsx)(o.a,{size:10}),paginationRowsPerPageOptions:[10,25,50,100],expandableRows:!0,expandableRowsComponent:function(e){var t=e.data;return Object(m.jsx)("div",{className:"w-full",children:Object(m.jsx)("div",{className:"py-2",children:t.detail.map((function(e,t){return Object(m.jsxs)(r.C,{children:[Object(m.jsx)(r.i,{md:3,sm:3,style:{marginLeft:"80px"},children:Object(m.jsx)(r.s,{children:e.typeKelas})}),Object(m.jsx)(r.i,{md:3,sm:3,children:Object(m.jsx)(r.s,{children:e.keterangan})}),Object(m.jsx)(r.i,{md:3,sm:3,children:Object(m.jsxs)(r.s,{children:[e.jumlah," "]})})]},t)}))})})},expandableRowExpanded:function(e){return e===G?1:0},expandOnRowClicked:!0,onRowClicked:function(e){return Q(e)},onRowExpandToggled:function(e,t){return Q(t)}})})})]})})}),Object(m.jsxs)(r.u,{backdrop:"static",centered:!0,isOpen:g,children:[Object(m.jsx)(r.x,{toggle:function(){return ue()},children:"Tambah Master Bayaran"}),Object(m.jsx)(r.v,{children:Object(m.jsxs)(r.C,{children:[Object(m.jsxs)(r.i,{md:12,sm:12,children:[Object(m.jsx)(r.s,{children:"Tahun Ajaran"}),Object(m.jsx)(h.a,{className:j()("react-select",{"is-invalid":""!==Z.idTahunAjaran}),classNamePrefix:"select",options:E,isClearable:!1,value:E&&E.find((function(e){return e.value===J.idTahunAjaran})),onChange:function(e){return U(Object(n.a)(Object(n.a)({},J),{},{idTahunAjaran:e.value}))}})]}),Object(m.jsxs)(r.i,{md:12,sm:12,className:"mt-1",children:[Object(m.jsx)(r.s,{children:"Tipe Kelas"}),Object(m.jsx)(h.a,{className:j()("react-select",{"is-invalid":""!==Z.tipeKelas}),classNamePrefix:"select",options:D,isClearable:!1,value:D&&D.find((function(e){return e.value===J.tipeKelas})),onChange:function(e){return U(Object(n.a)(Object(n.a)({},J),{},{tipeKelas:e.value}))}})]}),I&&I.map((function(e,t){return Object(m.jsxs)(r.i,{md:12,sm:12,className:"mt-1",children:[Object(m.jsx)(r.s,{children:e.label}),Object(m.jsx)(r.p,{type:"text",defaultValue:e.value,onChange:function(e){var a;a=e.target.value,I[t].value=a,M(I)}})]},t)}))]})}),Object(m.jsxs)(r.w,{children:[Object(m.jsx)(r.c,{color:"primary",onClick:function(){return je()},children:"Simpan"}),Object(m.jsx)(r.c,{color:"danger",outline:!0,onClick:function(){return ue()},children:"Batal"})]})]})]})}},97:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"c",(function(){return i})),a.d(t,"d",(function(){return o})),a.d(t,"b",(function(){return l}));var n=a(101),c=a(10),r=a.n(c),s=function(e){return new Promise((function(t,a){return r.a.get("".concat(n.a).concat(e),n.i).then((function(e){t(e)})).catch((function(e){Object(n.f)(e),a(e)}))}))},i=function(e,t){return new Promise((function(a,c){return r.a.post(n.a+e,t,n.i).then((function(e){a(e)})).catch((function(e){Object(n.f)(e),c(e)}))}))},o=function(e,t){return new Promise((function(a,c){return r.a.put(n.a+e,t,n.i).then((function(e){a(e)})).catch((function(e){Object(n.f)(e),c(e)}))}))},l=function(e,t){return new Promise((function(a,c){return r.a.patch(n.a+e,t,n.i).then((function(e){a(e)})).catch((function(e){Object(n.f)(e),c(e)}))}))}}}]);
//# sourceMappingURL=28.e2cf78df.chunk.js.map