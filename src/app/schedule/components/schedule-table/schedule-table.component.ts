import { Component, OnInit, ViewChild, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { ScheduleFormComponent } from '../schedule-form/schedule-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleService } from 'src/app/core/services/schedule.service';

const regConfig=[{type:"",label:"",name:"select",id:"select",value:false,isShowTable:true,isShowForm:false,width:"5%"},{type:"input",label:"ID",inputType:"text",name:"id",id:"id",isShowTable:false,isShowForm:false,width:"35%",value:""},{type:"input",label:"Nombre",inputType:"text",name:"name",id:"name",isShowTable:true,isShowForm:true,width:"25%",value:""},{type:"input",label:"Apellido Paterno",inputType:"text",name:"middleName",id:"middleName",isShowTable:true,isShowForm:true,width:"25%",value:""},{type:"input",label:"Apellido Materno",inputType:"text",name:"lastName",id:"lastName",isShowTable:true,isShowForm:true,width:"25%",value:""},{type:"checkbox",label:"Activo",name:"active",id:"active",value:false,isShowTable:true,isShowForm:true,width:"5%"},{type:"",label:"",name:"actions",id:"actions",value:!1,isShowTable:true,isShowForm:false,width:"15%"}];
@Component({
  selector: 'app-schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: ['./schedule-table.component.css']
})

export class ScheduleTableComponent implements OnInit {
  displayedColumns: string[] = [];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource: any;
  selected;
  catalogTitle: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<any>(true, []);
  relationId : string =  '';
  relationName : string =  '';
  constructor(@Optional() public dialogRef: MatDialogRef<ScheduleTableComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public response: any,
    private scheduleService: ScheduleService) {

    this.catalogTitle = 'Contactos';

    let relationData = [];
    this.displayedColumns = ['select', 'name','middleName','lastName', 'checkbox','active','actions']
 
    this.scheduleService.getSchedules().subscribe((response) => {
      this.dataSource = new MatTableDataSource(response);
    }, error => {
      console.log(error);
    });
    

  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectedRow(row) {
    this.selected = row;
    this.editRow(row);
  }

  private editRow(row: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth = "550px";
    dialogConfig.minWidth = "550px";
    dialogConfig.width = "550px";
    dialogConfig.data = { catalogTitle: this.catalogTitle, row: row, };
    const dialogRef = this.dialog.open(ScheduleFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        let item = this.dataSource.data.find(f => f.id == result.id);
        if (!item)
          this.dataSource.data.push(result);
        else {
          let fields = Object.keys(result);
          fields.forEach(fef => item[fef] = result[fef]);
        }
        this.dataSource._updateChangeSubscription();
      }
      this.selected = null;
    });
  }

  getValueByFieldName(name: string, field: string) {
    var item = regConfig.find(f => f.name == name);
    switch (field) {
      case 'label': {
        return item ? item.label : '';
      }
      case 'width': {
        return item ? item.width : '';
      }
      default: {
        return '';
      }
    }
  }

  getRow(row: any) {
    var item = regConfig.find(f => f.name == row.name);
    return item ? item.label : '';
  }

  newRow() {
    this.editRow([]);
  }

  setTemplateByColumn(element, column) {
    switch (column) {
      case 'select': {
        return '';
      }
      case 'actions': {
        return '';
      }
      case 'active': {
        return element['active'] ? 'Si' : 'No';
      }
      default: {
        return element[column];
      }
    }

  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  deleteRow(row) {
    this.deleteRows(row.id);
  }

  deleteRows(row: string) {
    let rows: string[];
    rows = [];
    let s = this.selection;
    let ds = this.dataSource;

    if (row == '00000000-0000-0000-0000-000000000000')
      s.selected.forEach(f => rows.push(f.id));
    else
      rows.push(row);


    // this.catalogService.deleteRowsByCatalog({ rows: rows, catalogId: this.catalogType }).subscribe((data) => {

    //   if (data.success) {
    //     if (row == '') {
    //       s.selected.forEach(fe => {
    //         this.updateActiveItem(ds, fe.id);
    //       });
    //       s.clear();
    //     }
    //     else {
    //       this.updateActiveItem(ds, row);
    //     }
    //     ds._updateChangeSubscription();

    //   }
    //   else {

    //   }
    // }, error => {
    //   console.log(error);
    // });
  }

  private updateActiveItem(ds: any, id: string) {
    let item = ds.data.find(f => f.id == id);
    if (item) item.active = false;
  }

  validateCatalogType(row: any){
    //return row.catalogId == CatalogType.AssetType;
  }

  configAssetType(row){

    // this.catalogService.getCatalogByCatalogTypeAndId(CatalogType.AssetProperty, row.id).subscribe((data) => {
    // let regConfigAssetProperty: any;
    // this.projectService.getFieldsByCatalog().subscribe((localData) => {
    //   let dataFilter = localData.filter(f => f.catalogId == CatalogType.AssetProperty ); 
    //   dataFilter.forEach(fe =>  { 
    //     if(fe.validations != null) {
    //     fe.validations.forEach(vfe => { 
    //       vfe.validator = this.projectService.getValidator(vfe.validator, vfe.fields != undefined ? vfe.fields: null); 
    //     });
    //   }
    //   });
      //regConfigAssetProperty = dataFilter;
      const dialogConfig = new MatDialogConfig();  
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.maxWidth   ="800px";
      dialogConfig.minWidth ="800px";
      dialogConfig.width    ="800px";
      dialogConfig.minHeight = "480px";
      dialogConfig.maxHeight = "610px";
      dialogConfig.height = "610px";
      dialogConfig.data     = {  data : row} ;
      const dialogRef = this.dialog.open(ScheduleFormComponent,dialogConfig);
    //   });

    // }, error => {
    //   console.log(error);
    // });

  }
}





