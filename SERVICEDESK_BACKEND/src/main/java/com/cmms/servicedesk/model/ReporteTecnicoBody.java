package com.cmms.servicedesk.model;

import java.util.Date;
import java.util.List;

public class ReporteTecnicoBody {

    private Date startDate;

    private Date endDate;

    private List<Sede> sede;

    public ReporteTecnicoBody(Date startDate, Date endDate, List<Sede> sede) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.sede = sede;
    }

    public ReporteTecnicoBody() {
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public List<Sede> getSede() {
        return sede;
    }

    public void setSede(List<Sede> sede) {
        this.sede = sede;
    }
}
